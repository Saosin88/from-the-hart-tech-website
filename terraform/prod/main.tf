module "redirect" {
  source              = "../modules/s3_and_cloudfront_website_redirect"
  acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
  route53_zone_id     = data.terraform_remote_state.shared.outputs.zone_id
  source_domain       = "fromthehart.tech"
  target_domain       = "www.fromthehart.tech"
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website-redirect"
    Environment = "prod"
    Terraform   = "true"
  }
}

module "website" {
  source              = "../modules/s3_and_cloudfront_static_website"
  acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
  route53_zone_id     = data.terraform_remote_state.shared.outputs.zone_id
  domain_name         = "www.fromthehart.tech"
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website"
    Environment = "prod"
    Terraform   = "true"
  }
}