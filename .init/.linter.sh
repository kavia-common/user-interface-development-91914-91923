#!/bin/bash
cd /home/kavia/workspace/code-generation/user-interface-development-91914-91923/tool_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

