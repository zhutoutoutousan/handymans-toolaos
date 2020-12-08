a=0
b=1
while (( $b -rt $1 )); do
	echo "$b"
	olda=$a
	a=$b
	b=$(($olda+$b))
done
