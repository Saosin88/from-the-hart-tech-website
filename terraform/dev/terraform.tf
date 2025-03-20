terraform {
  required_version = "~> 1"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5"
    }
  }

  backend "s3" {
    bucket       = "from-the-hart-terraform"
    key          = "state/dev.tfstate"
    region       = "af-south-1"
    use_lockfile = true
  }
}