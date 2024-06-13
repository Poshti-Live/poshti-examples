import { Channel, Poshti, USER_ROLES } from "poshti";
import { useState } from "react";

const config = {
  poshti_id: "<poshti-id>",
  channel_name: "<channel-name>",
  token: "<admin token>"
};



export default function App() {
  const [poshti] = useState(() => {
    const poshti = new Poshti({
      userRole: USER_ROLES.admin,
      params: {
        auth: config.token,
        pid: config.poshti_id,
      },
    })
    poshti.connect()
    return poshti
  })

  const [channel] = useState<Channel>(() => {
    const channel = poshti.channel(config.channel_name);
    channel.join()
    return channel
  })


  return (
    <div className="App">
      <button onClick={() => {
        channel?.push("TopicMessage", { message: prompt('message:'), date: Date.now() })
          .receive("ok", (payload) => console.log("replied:", payload))
          .receive("error", (err) => console.log("errored", err))
          .receive("timeout", () => console.log("pushing"));
      }}>Send Message via poshti</button>
    </div>
  );
}
