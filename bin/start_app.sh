#! /bin/sh
### BEGIN INIT INFO
# Provides:          rails app start
# Required-Start:    $local_fs $network
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: rails app start
# Description:       passenger restart and delayed hob restart
### END INIT INFO

[ -f /home/ubuntu/.bashrc ] && . /home/ubuntu/.bashrc

case "$1" in
    start)
        su - ubuntu -c "cd $ROOT_123CH && bin/delayed_job start"
        su - ubuntu -c "cd $ROOT_123CH && passenger start --daemonize --address 127.0.0.1 --environment=$RAILS_ENV"
    ;;
    stop)
        su - ubuntu -c "cd $ROOT_123CH && bin/delayed_job stop"
        su - ubuntu -c "cd $ROOT_123CH && passenger stop"
    ;;
    *)
        echo "Usage: $N {start|stop}" >&2
    exit 1
    ;;
esac

exit 0
