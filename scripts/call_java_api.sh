#!/bin/bash
# A quick script that I pulled together to help with developing the api
END_POINT="http://localhost:8081/api/v1/task"

# data is a dynamic variable: it can be a url param or a json filename.
# (not ideal to test all APIs, but works for this specific use case)
request() {
    endpoint="$END_POINT"
    verb="$1"
    data="$2" 

    json_payload=""

    [ "$verb" == "POST" ] && json_payload="$(cat "$data")"

    # the second conditional differentiates getAllTasks from getTask by id
    [ "$verb" == "GET" ] && [ ! -z "$data" ] && endpoint="${endpoint}/${data}"        

    [ "$verb" == "PUT" ] && json_payload="$(cat "$data")"
    
    [ "$verb" == "DELETE" ] && endpoint="${endpoint}/${data}"        

    curl_args=(
        -X "$verb"
        -H "Content-Type:application/json"
        -d "$json_payload"
        "$endpoint"
    )

    curl "${curl_args[@]}"
}

# I can change this later to accept json files as flag arguments.
# Also, getopts will just skip the read and delete flags if no flag argument is provided.
while getopts 'cr:ud:' flag; do
    case "$flag" in
     c)
        echo "create a task"

        request "POST" "create_task.json"
        ;;
     r)
        echo "get a task by its id"

        task_id=${OPTARG}
        request "GET" "$task_id"
        ;;
     u)
        echo "update a task"
        
        request "PUT" "update_task.json"
        ;;
     d)
        echo "delete a task by its id"

        task_id=${OPTARG}
        [ -z "$task_id" ] && echo "must include task id to delete it" && exit 1
        request "DELETE" 1
        ;;
    
     ?)
        echo "get all tasks"
        request "GET"
    esac
done
shift $((OPTIND-1))
