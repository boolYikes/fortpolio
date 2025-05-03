# TODOs
- [x] Prototyping(Figma)
- [x] Rough mock up
- [x] Branch out from now on, divide & conquer
- [x] Carousel API's style is being overwritten by MUI. Find a way around. Try Slick again with the index.css
- [x] Contact, Footer section
- [ ] Entity tenant components touch-up
- [x] Backend & DB
- [ ] Tests
- [x] Refactor components
- [ ] Convert to TS
- [x] Dockerize
- [x] CI & CD
    - Don't use bind mounts: messy permissions
    - Inside container,
    - Github webhook url must end with / 
    - `chmod 700 /var/jenkins_home/.ssh`
    - `ssh-keyscan -t rsa,ecdsa,ed25519 github.com >> /var/jenkins_home/.ssh/known_hosts` or scm will not work 
    - `chmod 644 /var/jenkins_home/.ssh/known_hosts`
- [x] Deployment
- [ ] Certbot cronjob
- [ ] Only one reverse proxy can exist(integrate the Jukebox LB)

# WIP
How many times have i taken down the website?😁

# Log
- Images in a MUI Box won't expand to its parents width even though they are explicit.
    - can only assume that the size of the image must be box-content-driven
    - IOW, the bg image is used as the bg of the texts, not the box element.
    - Read MUI docs for importing images
- Running certbot with http config and then adding https is a common sense...
```bash
# this was already done from the Jukebox stack. It was not due for renewal(copy pasted certs)
docker run --rm -it \
    -v ./certbot/conf:/etc/letsencrypt \
    -v ./certbot/www:/var/www/certbot \
    -v ./certbot/logs:/var/log/letsencrypt \
    certbot/certbot \
    certonly --webroot -w /var/www/certbot -d dees.kr -d www.dees.kr --non-interactive --agree-tos --email tunacome@gmail.com
```