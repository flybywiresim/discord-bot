#!/bin/bash

CDN_URL=$CLOUDFLARE_CDN_URL
CDN_DIR=${1:-"assets/images"}
LOCAL_DIR=${2:-"assets/images"}

MAX_RETRY=5

upload () {
    FILE=${@}
    DEST_FILE=${FILE#"${LOCAL_DIR}"};
    DEST_FILE=${DEST_FILE#"/"};
    DEST="${CDN_URL}/${CDN_DIR}/${DEST_FILE}";
    echo "Syncing files: ${FILE}"
    echo "Destination: ${DEST}"

    # Try to upload the file up to MAX_RETRY times before failing
    counter=0
    until curl -s --fail -X PUT -H "X-FBW-Access-Key: $CLOUDFLARE_ACCESS_KEY" -T "${FILE}" "${DEST}"
    do
        sleep 1
        [[ counter -eq ${MAX_RETRY} ]] && echo "Failed to upload files '${FILE}'" >&2 && exit 1
        echo "Trying again. Try #${counter}"
        ((counter++))
    done
    echo ""; echo ""
}

for file in $(find ${LOCAL_DIR} -type f); do
    upload ${file}
done
