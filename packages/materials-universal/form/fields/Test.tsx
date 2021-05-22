import * as React from 'react';
import { useCallback } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

function readFile({ files }: HTMLInputElement): Promise<string | null> {
  return new Promise<string | null>(resolve => {
    if (!files.length) {
      return resolve(null);
    }

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result.toString());
      },
      false,
    );
    reader.readAsText(files[0]);
  });
}

function TxtReader({ value, onChange }: Props) {
  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = await readFile(e.target);
    if (!content) {
      return;
    }
    console.log('content: ', content);
    onChange(content);
  }, []);

  return (
    <div>
      <label>选择文件(*.txt)</label>
      <input type="file" accept=".txt" onChange={onFileChange} />
      <p>{value}</p>
    </div>
  );
}

export default {
  name: 'TxtReader',
  component: TxtReader,
};
