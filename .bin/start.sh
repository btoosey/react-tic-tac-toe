#!/bin/sh

if [ -d "/projects/app/.theia" ]; then
  if [ ! -d "/projects/.theia" ]; then
    cp -R /projects/app/.theia /projects/.theia
  fi
fi

export NODE_OPTIONS=--max_old_space_size=4096
NODE_OPTIONS=--max_old_space_size=4096 npm ci && npm start
