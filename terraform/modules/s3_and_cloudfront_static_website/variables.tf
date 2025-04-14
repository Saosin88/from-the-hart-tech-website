variable "domain_name" {
  description = "Domain name for CloudFront aliases and S3 bucket"
  type        = string
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
}
