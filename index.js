#!/usr/bin/env node

///////////////////////////////////////////////////////////////////////////////

import { runUi } from './src/ConsoleUi.js'

///////////////////////////////////////////////////////////////////////////////

try
{
    await runUi()
}
catch (error)
{
    if (error instanceof Error && error.name === 'ExitPromptError')
    {
        // noop; silence this error
    }
    else
    {
        throw error;
    }
}


///////////////////////////////////////////////////////////////////////////////
