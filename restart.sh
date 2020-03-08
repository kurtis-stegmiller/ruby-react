#!/bin/bash
passenger stop

[[ "$RAILS_ENV" == development ]] && rm log/*.log

passenger start
