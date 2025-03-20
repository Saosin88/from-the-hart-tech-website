module "website" {
  source              = "../modules/s3_and_cloudfront_static_website"
  acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
  route53_zone_id     = data.terraform_remote_state.shared.outputs.zone_id
  domain_name         = "dev.fromthehart.tech"
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website"
    Environment = "dev"
    Terraform   = "true"
  }
}