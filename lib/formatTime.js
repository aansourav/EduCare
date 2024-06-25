export default function formatTime(dbTime) {
    const date = new Date(dbTime);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}
