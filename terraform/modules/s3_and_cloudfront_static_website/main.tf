resource "aws_s3_bucket" "bucket" {
  bucket = var.domain_name
  force_destroy = true
  tags   = var.tags
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.cloudfront_policy.json
}

data "aws_iam_policy_document" "cloudfront_policy" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.distribution.arn]
    }
  }
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${var.domain_name}-oac"
  description                       = "Grant cloudfront access to s3 bucket ${aws_s3_bucket.bucket.id}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "spa_function" {
  name    = "spa_index_transform_${replace(var.domain_name, ".", "_")}"
  runtime = "cloudfront-js-2.0"
  comment = "Make sure that the index.html file is served for all requests"
  publish = true
  code    = file("${path.module}/spa_index_transformation.js")
}

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name              = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_id                = aws_s3_bucket.bucket.bucket_regional_domain_name
  }

  is_ipv6_enabled     = true
  enabled             = true
  default_root_object = "index.html"
  aliases = [var.domain_name]

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.bucket.bucket_regional_domain_name
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_function.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

viewer_certificate {
    cloudfront_default_certificate = true
  }

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 200
    response_page_path    = "/404.html"
  }

  tags = var.tags
}