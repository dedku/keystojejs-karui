import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { DocumentRenderer } from '@keystone-6/document-renderer'

import dotenv from 'dotenv'
dotenv.config()

// Check if user is an admin
type SessionContext = { data: { id: string; isAdmin: boolean; name: string } }
export const isAdmin = ({ session }: { session: SessionContext }) => session?.data.isAdmin

// Show ony user profile to exact session user
export const filterUser = ({ session }: { session: SessionContext }) => {
  if (session?.data.isAdmin) return true;
  return { name: { equals: session?.data.name } };
}


// Show only when session user isAdmin
export const showIfAdmin = ({ session }: { session: SessionContext }) => {
  if (session?.data.isAdmin) return 'edit';
  return 'hidden';
}

// render Document conetent to sting
export function renderDocument({ document }: { document: any }) {
  return ReactDOMServer.renderToString(<DocumentRenderer document={document} />)
}
