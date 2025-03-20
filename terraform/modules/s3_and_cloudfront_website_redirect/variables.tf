variable "acm_certificate_arn" {
  description = "The ARN of the ACM certificate for the redirect domain"
  type        = string
}

variable "route53_zone_id" {
  description = "The ID of the hosted zone for the redirect domain"
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