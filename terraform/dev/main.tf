module "website" {
  source              = "../modules/s3_and_cloudfront_static_website"
  domain_name         = "dev.fromthehart.tech"
  acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website"
    Environment = "dev"
    Terraform   = "true"
  }
}