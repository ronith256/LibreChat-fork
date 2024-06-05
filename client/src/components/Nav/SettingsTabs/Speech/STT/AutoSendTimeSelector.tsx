import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Slider, InputNumber } from '~/components/ui';
import { useLocalize } from '~/hooks';
import store from '~/store';
import { cn, defaultTextProps, optionText } from '~/utils/';

export default function AutoSendTimeSelector() {
  const localize = useLocalize();
  const speechToText = useRecoilValue(store.SpeechToText);
  const [autoSendTextTimeout, setTimeOutValue] = useRecoilState(store.autoSendTextTimeout);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between">
        <div>{localize('com_nav_db_text_timeout')}</div>
        <div className="w-2" />
        <small className="opacity-40">({localize('com_endpoint_default_with_num', '3')})</small>
      </div>
      <div className="flex items-center justify-between">
        <Slider
          value={[autoSendTextTimeout ?? 3]}
          onValueChange={(value) => setTimeOutValue(value[0])}
          doubleClickHandler={() => setTimeOutValue(3)}
          min={0.1}
          max={5}
          step={0.1}
          className="ml-4 flex h-4 w-24"
          disabled={!speechToText}
        />
        <div className="w-2" />
        <InputNumber
          value={autoSendTextTimeout}
          disabled={!speechToText}
          onChange={(value) => setTimeOutValue(value ? value[0] : 0)}
          min={0.05}
          max={5}
          className={cn(
            defaultTextProps,
            cn(
              optionText,
              'reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200',
            ),
          )}
        />
      </div>
    </div>
  );
}
