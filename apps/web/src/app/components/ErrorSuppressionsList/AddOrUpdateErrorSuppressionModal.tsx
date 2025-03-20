
import classNames from 'classnames';
import deepEqual from 'deep-equal';
import React, { useEffect, useState } from 'react';

import { ErrorSuppressionDTO } from '@sauron/types';
import { borderClasses } from '../../styling';
import MatchersInput from './MatchersInput';
import { GenericButton } from '../common/buttons';
import { useCreateErrorSuppressionMutation, useUpdateErrorSuppressionMutation } from '../../redux/api/errorSuppressionApi';

interface AddOrUpdateErrorSuppressionModalProps {
  onOpenChange: (open: boolean) => void;
  errorSuppression?: ErrorSuppressionDTO;
}

const AddOrUpdateErrorSuppressionModal: React.FC<AddOrUpdateErrorSuppressionModalProps> = ({
  onOpenChange,
  errorSuppression,
}) => {
  const {
    id,
    createdAt,
    functionName: existingFunctionName,
    matchers: existingMatchers = [],
    reason: existingReason,
  } = errorSuppression || {};

  const originalError = errorSuppression;

  const deconstructedFunctionName = existingFunctionName
    ? existingFunctionName.split('-')
    : [];

  const [reason, setReason] = useState(existingReason);

  const [service, setService] = useState(
    deconstructedFunctionName.length !== 0 ? `${deconstructedFunctionName[0]}-${deconstructedFunctionName[1]}` : ''
  );
  const [functionName, setFunctionName] = useState(
    deconstructedFunctionName.length !== 0 ? deconstructedFunctionName[2] : '',
  );
  const [matchers, setMatchers] = useState<string[]>(existingMatchers);
  const [saveDisabled, setSaveDisabled] = useState(true);

  const [createErrorSuppression, {
    isLoading: isCreating,
  }] = useCreateErrorSuppressionMutation();

  const [updateErrorSuppression, {
    isLoading: isUpdating,
  }] = useUpdateErrorSuppressionMutation();

  const resetForm = () => {
    setService('');
    setFunctionName('');
    setMatchers([]);
    setReason('');
  };


  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const handleAddMatcher = (matcher: string) => {
    setMatchers([...matchers, matcher]);
  };

  const handleDeleteMatcher = (index: number) => {
    setMatchers(matchers.filter((_, i) => i !== index));
  };

  const handleUpdateMatcher = (index: number, value: string) => {
    setMatchers(matchers.map((m, i) => (i === index ? value
    : m)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await updateErrorSuppression({
        id,
        data: {
          functionName: `${service}-${functionName}`,
          matchers,
          reason,
        }
      });
    } else {
      await createErrorSuppression({
        functionName: `${service}-${functionName}`,
        matchers,
        reason,
      });
    }
    resetForm();
    onOpenChange(false);
  };

  useEffect(() => {
    setSaveDisabled(
      !(service && functionName && matchers.length && matchers[0] !== '')
      || deepEqual(originalError, {
        id,
        createdAt,
        functionName: `${service}-${functionName}`,
        matchers,
        ...reason ? { reason } : {},
      })
    );

    console.log(originalError);
    console.log({ id, createdAt, functionName: `${service}-${functionName}`, matchers, reason });
  }, [service, functionName, matchers, id, originalError, reason, createdAt]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm m-0">
      <div className={classNames(borderClasses, 'bg-background-400 p-8 rounded-lg w-full max-w-md')}>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className={classNames('space-y-2')}>
            <label htmlFor="service">Service Name</label>
            <br />
            <input
              id="service"
              className={classNames('p-2 border rounded-md')}
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="e.g. sauron-prod"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="functionName">Function Name</label>
            <br />
            <input
              id="functionName"
              value={functionName}
              className={classNames('p-2 border rounded-md')}
              onChange={(e) => setFunctionName(e.target.value)}
              placeholder="e.g. postGetUserProfile"
            />
          </div>
          
          <div className="space-y-3">
            <label>Regex Ignore Patterns</label>
            <MatchersInput
              matchers={matchers}
              handleAddMatcher={handleAddMatcher}
              handleDeleteMatcher={handleDeleteMatcher}
              handleUpdateMatcher={handleUpdateMatcher}
              />
          </div>

          <div className="space-y-2">
              <label htmlFor="reason">Reason</label>
              <br />
              <textarea
                id="reason"
                value={reason}
                className="border rounded w-full py-2 px-3 mr-2"
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. known issue"
              />
            </div>

          <div className='flex space-x-2'>
            <GenericButton
              text='Cancel'
              primary={false} 
              onClick={() => handleOpenChange(false)}
            />
            <GenericButton
              text='Save'
              primary={true}
              disabled={saveDisabled}
              loading={isCreating || isUpdating}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateErrorSuppressionModal;
