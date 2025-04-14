module "website" {
  source              = "../modules/s3_and_cloudfront_static_website"
  domain_name         = "dev.fromthehart.tech"
  tags = {
    Domain      = "tech"
    Project     = "from-the-hart-tech-website"
    Environment = "dev"
    Terraform   = "true"
  }
}