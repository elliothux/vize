import * as React from 'react';
import { ResourceRecord } from 'sharedTypes';
import { BiFileBlank } from 'react-icons/bi';

export interface PreviewProps {
  item: ResourceRecord;
  onPreview?: () => void;
}

export function getResourceURL({ url, filename }: ResourceRecord, withDomain = false) {
  return url || `${withDomain ? window.location.origin : ''}/resource/${filename}`;
}

export function ImagePreview({ item, onPreview }: PreviewProps) {
  return <img className="image-preview" src={getResourceURL(item)} alt="preview" onClick={onPreview} />;
}

export function VideoPreview({ item }: PreviewProps) {
  return (
    <video width="100%" height="100%" className="video-preview" controls muted autoPlay={false}>
      <source src={getResourceURL(item)} />
    </video>
  );
}

export function AudioPreview({ item }: PreviewProps) {
  return (
    <audio className="audio-preview" controls autoPlay={false}>
      <source src={getResourceURL(item)} />
    </audio>
  );
}

export function OtherPreview({ item, onPreview }: PreviewProps) {
  return (
    <div className="other-preview" onClick={onPreview}>
      <div className="other-preview-extension">
        <BiFileBlank />
        <span>{item.extension}</span>
      </div>
      <p>{item.filename}</p>
    </div>
  );
}
