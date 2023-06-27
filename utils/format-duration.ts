export function formatDuration(duration: string) {
    const dur = duration.split('m')
    let secs = dur[1].replace('s', '')
    // if(secs.length === 1) secs = '0' + secs
    return `${dur[0]}:${secs.length === 1 ? '0' + secs : secs}`
}