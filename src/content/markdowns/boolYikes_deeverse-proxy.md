---
name: Dee-verse Proxy
date: 2025-06-01
tags: [nginx, certbot, docker]
summary: Nginx L7 proxy for home server
---

## Personal Gatekeeper?
Home server is the way to go

## Procedure
- `docker network create nginx-shared` for simulating VPC (to be replaced with a K8S cluster)
- Run them services
- Run this compose

## TODO
- [x] Detach reverse proxy from Jukebox and Fortpolio and run it independently
- [x] Execution scripts
- [x] Schedule certbot (semi-automated) + init automation
- [ ] Fort is not proxied through this anymore
- [ ] Repurpose it later for K8S
- [x] Refactor nginx configs to use `include`
- [ ] Security measures

## Log
- Using variables in .conf prevents nginx from prematurely resolving the hostname even when the service is not up.
    - Now nginx waits until a request is made.
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
- In nginx.conf:
- Uses same external network 
- -> use the app's port, no need to forward it 
- -> set upstream server port to the app's port
- This was a big help : 
- [Jenkins with Nginx](https://www.jenkins.io/doc/book/system-administration/reverse-proxy-configuration-with-jenkins/reverse-proxy-configuration-nginx/)
- [RP Troubleshooting](https://www.jenkins.io/doc/book/system-administration/reverse-proxy-configuration-troubleshooting/)

![alt text](image.png)

![alt text](image-1.png)

*Finally...*
