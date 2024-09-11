if [ $# -eq 0 ]; then
        echo "No argument provided."
        exit 1
fi
for arg in "$@"[03]; do
        echo "$arg"
        count=$((count + 1))
        if [ $count -eq 3 ]; then
        break
        fi
done
