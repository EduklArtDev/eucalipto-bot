#! /bin/bash

echo "Build (1) - Remove Cache and Auth (2)"
read bildOrRemove

if [ "$bildOrRemove" == "1" ]; then

echo "Facilitando sua life..."

cd src/

npm run build

sleep 10s

npm run start:dev

sleep 10s

npm run start:prod

elif [ "$bildOrRemove" == "2"  ]; then

    echo "Remove.."

    rm -r .wwebjs_auth

    sleep 3s

    rm -r .wwebjs_cache

    echo "removido!"

else

echo "erro!"

fi
