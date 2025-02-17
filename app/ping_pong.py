#!/usr/bin/env python3

import sys
import json
import struct
import re

USER_JS_FILE = "/home/thinkpad/.mozilla/firefox/0ws0o1v8.default-1738606038143/user.js"
PREFS_JS_FILE = "/home/thinkpad/.mozilla/firefox/0ws0o1v8.default-1738606038143/prefs.js"
PATTERN = re.compile("^user_pref\s*\(\s*['\"]([^'\"]*)['\"]\s*,\s*(?:['\"]([^'\"]*)['\"]|(\d+))\s*\)")
doh_key = "network.trr.mode"

# Read a message from stdin and decode it.
def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    return json.loads(message)

# Encode a message for transmission, given its content.
def encodeMessage(messageContent):
    # https://docs.python.org/3/library/json.html#basic-usage
    # To get the most compact JSON representation, you should specify
    # (',', ':') to eliminate whitespace.
    # We want the most compact representation because the browser rejects
    # messages that exceed 1 MB.
    encodedContent = json.dumps(messageContent, separators=(',', ':')).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

# Send an encoded message to stdout
def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage['length'])
    sys.stdout.buffer.write(encodedMessage['content'])
    sys.stdout.buffer.flush()
    

def isDoHEnabled():
        with open(PREFS_JS_FILE, "r") as f:
             for line in f:
                doh_key_position = line.find(doh_key)
                if doh_key_position > -1:
                    pattern = re.compile(",\\s*(\\d+)\\s*\\)")
                    match = pattern.search(line[doh_key_position+len(doh_key):])
                    if match:
                        doh_value = int(match.group(1))
                        return not (doh_value == 0 or doh_value == 5)

def toggleDoH():
        f = open(USER_JS_FILE, "r")
        user_js_lines = []
        user_js_lines += f.readlines()
        f.close()
        for line_number, line in enumerate(user_js_lines):
            doh_key_position = line.find(doh_key)
            if doh_key_position > -1:
                
                pattern = re.compile(",\\s*(\\d+)\\s*\\)")
                match = pattern.search(line[doh_key_position+len(doh_key):])
                print(line)
                print(match.group(1))
                if match:
                    doh_value = int(match.group(1))
                    enable = (doh_value == 0 or doh_value == 5)
                    user_js_lines[line_number] = f'user_pref("network.trr.mode", {3 if enable else 0});\n'
                    break
        else:
             # if no network.trr.mode key was found, add a new one at the end of user js file.
             user_js_lines.append('\nuser_pref("network.trr.mode", 3);\n')
                    

        f = open(USER_JS_FILE, "w")
        f.writelines(user_js_lines)
        f.truncate()
        f.close()

while True:
    receivedMessage = getMessage()
    if receivedMessage == "status":
        status = isDoHEnabled()
        if status is not None:
             sendMessage(encodeMessage(status)) # return true if enabled, false if not
    elif receivedMessage == "toggle":
         toggleDoH()
         sendMessage(encodeMessage(""))
         
        