## Build your own head

This is a basic implementation of the UNIX command line tool head.

## Commands supported

- `npm start -- cchead filename1.txt` (displays the first 10 lines of file1.txt)
- `npm start -- cchead filename1.txt filename2.txt` (displays the same for multiple files)
- `npm start -- cchead -n5 <enter paths to file/s as shown above>` (displays the first 5 lines)
- `npm start -- cchead -c 17 <enter paths to files as shown above>` (displays the first 'c' bytes , in this case first 17 bytes of the files mentioned)
