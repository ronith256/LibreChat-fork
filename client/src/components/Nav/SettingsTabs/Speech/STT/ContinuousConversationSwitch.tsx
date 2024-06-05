import { useRecoilState } from 'recoil';
import { Switch } from '~/components/ui';
import { useLocalize } from '~/hooks';
import store from '~/store';

export default function ContinuousConversationSwitch({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  const localize = useLocalize();
  const [continuousConversationSwitch, setcontinuousConversationSwitch] = useRecoilState<boolean>(
    store.continuousConversationSwitch,
  );
  const [speechToText] = useRecoilState<boolean>(store.SpeechToText);

  const handleCheckedChange = (value: boolean) => {
    setcontinuousConversationSwitch(value);
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>{localize('com_nav_continuous_conversation')}</div>
      <Switch
        id="continuousConversationSwitch"
        checked={continuousConversationSwitch}
        onCheckedChange={handleCheckedChange}
        className="ml-4"
        data-testid="continuousConversationSwitch"
        disabled={!speechToText}
      />
    </div>
  );
}
