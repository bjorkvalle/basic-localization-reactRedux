import * as React from 'react';
import { NavMenu } from './NavMenu';
import TranslationBar from './TranslationBar';
import WithLocalization from './WithLocalization';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
            <WithLocalization>
                <TranslationBar />
                <div className='row'>
                    <div className='col-sm-3'>
                        <NavMenu />
                    </div>
                    <div className='col-sm-9'>
                        {this.props.children}
                    </div>
                </div>
            </WithLocalization>
        </div>;
    }
}
