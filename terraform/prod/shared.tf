# Reference shared resources
data "terraform_remote_state" "shared" {
  backend = "s3"
  config = {
    bucket  = "from-the-hart-terraform"
    key     = "state/shared.tfstate"
    region  = "af-south-1"
  }
}