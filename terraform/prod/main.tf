# module "redirect" {
#   source              = "../modules/s3_and_cloudfront_website_redirect"
#   source_domain       = "fromthehart.tech"
#   target_domain       = "www.fromthehart.tech"
#   acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
#   tags = {
#     Domain      = "tech"
#     Project     = "from-the-hart-tech-website-redirect"
#     Environment = "prod"
#     Terraform   = "true"
#   }
# }

module "website" {
  source              = "../modules/s3_and_cloudfront_static_website"
  domain_name         = "www.fromthehart.tech"
  acm_certificate_arn = data.terraform_remote_state.shared.outputs.acm_certificate_arn
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website"
    Environment = "prod"
    Terraform   = "true"
  }
}