/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, useTheme } from '@keystone-ui/core';
import { InfoIcon } from '@keystone-ui/icons/icons/InfoIcon';
import { AlertTriangleIcon } from '@keystone-ui/icons/icons/AlertTriangleIcon';
import { AlertOctagonIcon } from '@keystone-ui/icons/icons/AlertOctagonIcon';
import { CheckCircleIcon } from '@keystone-ui/icons/icons/CheckCircleIcon';
import { Trash2Icon } from '@keystone-ui/icons/icons/Trash2Icon';
import { Tooltip } from '@keystone-ui/tooltip';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@keystone-6/fields-document/primitives';

const noticeIconMap = {
  info: InfoIcon,
  error: AlertOctagonIcon,
  warning: AlertTriangleIcon,
  success: CheckCircleIcon,
};

export const componentBlocks = {
  notice: component({
    component: function Notice({ content, intent }) {
      const { palette, radii, spacing } = useTheme();
      const intentMap = {
        info: {
          background: palette.blue100,
          foreground: palette.blue700,
          icon: noticeIconMap.info,
          class: 'info',
        },
        error: {
          background: palette.red100,
          foreground: palette.red700,
          icon: noticeIconMap.error,
          class: 'error',
        },
        warning: {
          background: palette.yellow100,
          foreground: palette.yellow700,
          icon: noticeIconMap.warning,
          class: 'warning',
        },
        success: {
          background: palette.green100,
          foreground: palette.green700,
          icon: noticeIconMap.success,
          class: 'success',
        },
      };
      const intentConfig = intentMap[intent.value];

      return (
        <div
          className={intentConfig.class}
          css={{
            borderRadius: radii.small,
            display: 'flex',
            paddingLeft: spacing.medium,
            paddingRight: spacing.medium,
          }}
          style={{
            background: intentConfig.background,
          }}
        >
          <NotEditable>
            <div
              css={{
                color: intentConfig.foreground,
                marginRight: spacing.small,
                marginTop: '1em',
              }}
            >
              <intentConfig.icon />
            </div>
          </NotEditable>
          <div css={{ flex: 1 }}>{content}</div>
        </div>
      );
    },
    label: 'Notice',
    chromeless: true,
    props: {
      intent: fields.select({
        label: 'Intent',
        options: [
          { value: 'info', label: 'Info' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
          { value: 'success', label: 'Success' },
        ] as const,
        defaultValue: 'info',
      }),
      content: fields.child({
        kind: 'block',
        placeholder: '',
        formatting: 'inherit',
        dividers: 'inherit',
        links: 'inherit',
        relationships: 'inherit',
      }),
    },
    toolbar({ props, onRemove }) {
      return (
        <ToolbarGroup>
          {props.intent.options.map(opt => {
            const Icon = noticeIconMap[opt.value];

            return (
              <Tooltip key={opt.value} content={opt.label} weight="subtle">
                {attrs => (
                  <ToolbarButton
                    isSelected={props.intent.value === opt.value}
                    onClick={() => {
                      props.intent.onChange(opt.value);
                    }}
                    {...attrs}
                  >
                    <Icon size="small" />
                  </ToolbarButton>
                )}
              </Tooltip>
            );
          })}

          <ToolbarSeparator />

          <Tooltip content="Remove" weight="subtle">
            {attrs => (
              <ToolbarButton variant="destructive" onClick={onRemove} {...attrs}>
                <Trash2Icon size="small" />
              </ToolbarButton>
            )}
          </Tooltip>
        </ToolbarGroup>
      );
    },
  }),
  quote: component({
    component: ({ attribution, content }) => {
      return (
        <div
          css={{
            paddingLeft: 16,
            backgroundColor: '#f3f5f6',
            padding: '4px 12px 16px 48px',
            position: 'relative',
            borderRadius: 6,
            ':after': {
              content: '"\\201C"',
              position: 'absolute',
              top: 0,
              left: 16,
              fontSize: '4rem',
            },
          }}
        >
          <div css={{ fontStyle: 'italic', color: '#4A5568' }}>{content}</div>
          <div css={{ fontWeight: 'bold', color: '#47546b' }}>
            <NotEditable>— </NotEditable>
            {attribution}
          </div>
        </div>
      );
    },
    label: 'Quote',
    props: {
      content: fields.child({
        kind: 'block',
        placeholder: 'Quote...',
        formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
        links: 'inherit',
      }),
      attribution: fields.child({ kind: 'inline', placeholder: 'Attribution...' }),
    },
    chromeless: true,
  }),
};