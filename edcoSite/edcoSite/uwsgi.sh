#!/bin/bash
ps aux | grep uwsgi | grep django | awk '{print $2}'|xargs kill -9
uwsgi -s 127.0.0.1:9090 --chdir=/home/edcoSite/edcoSite --pp .. -w wsgi > /home/django.log 2>&1 -p 4 -d /home/django.log &
