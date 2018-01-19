# Hide

## Installation

```
$ git clone https://github.com/joyneop/hide.git
$ cd hide
$ npm install .
$ npm link
```s

## Usage

```
$ hide file_1 file_2 file_3 // Hide certain files or directories in current directory
$ hide -a // Hide all files and directories in current directory
$ hide -r // Release all hidden files and directories in current directory
```

## How It Works

When hiding a file or directory, it is renamed with a prefix `.0FEFC2FF211E40EA806E84205540F8B8`. And when releasing, all files and directories with the prefix in their names will get the prefix removed.

## Copyright

MIT License.
