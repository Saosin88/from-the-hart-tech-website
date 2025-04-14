variable "acm_certificate_arn" {
  description = "ARN of the ACM certificate for CloudFront"
  type        = string
}

variable "source_domain" {
  description = "Source domain for redirection (e.g., fromthehart.tech)"
  type        = string
}

variable "target_domain" {
  description = "Target domain to redirect to (e.g., www.fromthehart.tech)"
  type        = string
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
}