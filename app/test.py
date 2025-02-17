#!/usr/bin/env python3

import re

USER_JS_FILE = "/home/laptop/Documents/native-messaging/app/user.js"
doh_key = "network.trr.mode"


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
                    
        
        #print(user_js_lines[idx])

        f = open(USER_JS_FILE, "w")
        f.writelines(user_js_lines)
        f.truncate()
        f.close()

toggleDoH()