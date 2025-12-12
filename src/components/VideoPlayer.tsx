import { Video } from "./Collection";
import VideoJSPlayer from "./VideoJSPlayer";

export default function VideoPlayer(props: { video: Video }) {
    if (props.video.url.includes("vimeo")) {
        return (
            <iframe
                src={props.video.url}
                class="aspect-video w-full"
                allow="fullscreen"
            ></iframe>
        )
    } else if (props.video.url.includes("gumlet")) {
        return (
            <VideoJSPlayer video={props.video} />
        )
    } else {
        return (
            <img
                src={props.video.url}
                class="object-cover w-full"
            />
        )
    }
}