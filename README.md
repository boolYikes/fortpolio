![Build Status](./web/badges/build-status.svg)

## Waaaab Aaaaaab

## WIP

- Half-way there!
- How many times have i taken down the website?😁

## Done

These are tracked under issues now.

- [x] Prototyping(Figma)
- [x] Rough mock up
- [x] Branch out from now on, divide & conquer
- [x] Carousel API's style is being overwritten by MUI. Find a way around. Try Slick again with the index.css
- [x] Contact, Footer section
- [x] Backend & DB
- [x] Refactor components
- [x] Dockerize
- [x] CI & CD
  - Don't use bind mounts: messy permissions
  - Inside container,
  - Github webhook url must end with /
  - `chmod 700 /var/jenkins_home/.ssh`
  - `ssh-keyscan -t rsa,ecdsa,ed25519 github.com >> /var/jenkins_home/.ssh/known_hosts` or scm will not work
  - `chmod 644 /var/jenkins_home/.ssh/known_hosts`
- [x] Deployment
- [x] Only one reverse proxy can exist(detach LB)
- [x] Detach Jenkins to a project and make a Dockerfile for user permissions

## Logs

- Images in a MUI Box won't expand to its parents width even though they are explicit.
  - can only assume that the size of the image must be box-content-driven
  - IOW, the bg image is used as the bg of the texts, not the box element.
  - Read MUI docs for importing images
- For Jenkins webhook, the payload url from the github-side should end with /. This was modified from the reverse proxy.
