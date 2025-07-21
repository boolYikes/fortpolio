![Build Status](./web/badges/build-status.svg)

### Logs

- For Jenkins webhook, the payload url from the github-side should end with /. This was modified from the reverse proxy.

### Done

<details>
<summary>These are tracked under issues now.</summary>
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
</details>
