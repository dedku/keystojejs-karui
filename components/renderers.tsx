import React from 'react'
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks';
import { componentBlocks } from './componentBlocks';

export const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = {
  notice: ({intent, content}) => {
    return <div className={intent} >{content}</div>
  },
  quote: ({content, attribution}) =>{
    return <div className='quote'><p className='quote-content'>{content}</p><p className='quote-attribution'>{attribution}</p></div>
  }
};