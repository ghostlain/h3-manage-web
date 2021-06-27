import Icon from '@ant-design/icons';

const ParkingSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14748" width="18px" height="18px"><path d="M170.666667 128h682.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m42.666666 85.333333v597.333334h597.333334V213.333333H213.333333z m170.666667 85.333334h149.333333a149.333333 149.333333 0 0 1 0 298.666666H469.333333v128H384V298.666667z m85.333333 85.333333v128h64a64 64 0 0 0 0-128H469.333333z" p-id="14749"></path></svg>
);
export const ParkingIcon = (props: any) => <Icon component={ParkingSvg} {...props} />


const AreaSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12015" width="1em" height="1em"><path d="M950.857143 0a73.142857 73.142857 0 0 1 73.142857 73.142857v877.714286a73.142857 73.142857 0 0 1-73.142857 73.142857H73.142857a73.142857 73.142857 0 0 1-73.142857-73.142857V73.142857a73.142857 73.142857 0 0 1 73.142857-73.142857h877.714286z m-73.142857 272.603429L272.603429 877.714286h158.866285L877.714286 431.469714V272.603429z m0 365.714285L638.317714 877.714286H877.714286V638.317714zM146.285714 431.542857L431.542857 146.285714H146.285714v285.257143zM638.390857 146.285714L146.285714 638.390857v158.793143L797.184 146.285714H638.390857z" p-id="12016" fill="#1296db"></path></svg>
);

export const AreaIcon = (props: any) => <Icon component={AreaSvg} {...props} />

const EnterChannelSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25715" width="1em" height="1em"><path fill='#13227a' d="M146.432 0.580267h729.361067A145.885867 145.885867 0 0 1 1021.610667 146.432v729.361067a145.885867 145.885867 0 0 1-145.851734 145.851733H146.432a145.885867 145.885867 0 0 1-145.851733-145.851733V146.432A145.885867 145.885867 0 0 1 146.432 0.580267z m506.641067 911.701333l222.72-164.1472-222.72-164.078933v94.208H146.432v141.448533h506.641067v92.535467z m222.72-530.193067V240.64H369.152V146.432L146.432 310.545067l222.72 164.113066v-92.5696h506.641067z" p-id="25716"></path></svg>
)

export const EnterChannelIcon = (props: any) => <Icon component={EnterChannelSvg} {...props} />

const ExitChannelSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25715" width="1em" height="1em"><path fill='#d4237a' d="M146.432 0.580267h729.361067A145.885867 145.885867 0 0 1 1021.610667 146.432v729.361067a145.885867 145.885867 0 0 1-145.851734 145.851733H146.432a145.885867 145.885867 0 0 1-145.851733-145.851733V146.432A145.885867 145.885867 0 0 1 146.432 0.580267z m506.641067 911.701333l222.72-164.1472-222.72-164.078933v94.208H146.432v141.448533h506.641067v92.535467z m222.72-530.193067V240.64H369.152V146.432L146.432 310.545067l222.72 164.113066v-92.5696h506.641067z" p-id="25716"></path></svg>
)
export const ExitChannelIcon = (props: any) => <Icon component={ExitChannelSvg} {...props} />
