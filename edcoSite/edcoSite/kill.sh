#!/bin/bash
ps aux | grep uwsgi | grep django | awk '{print $2}'|xargs kill -9
