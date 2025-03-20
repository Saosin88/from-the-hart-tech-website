variable "acm_certificate_arn" {
  description = "ARN of the ACM certificate for CloudFront"
  type        = string
}

variable "route53_zone_id" {
  description = "The ID of the hosted zone for the redirect domain"
  type        = string
}

variable "domain_name" {
  description = "Domain name for CloudFront aliases and S3 bucket"
  type        = string
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
}
