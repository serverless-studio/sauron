
import React, { useEffect, useState } from 'react';
import { ErrorSuppressionDTO } from '@sauron/types';
import { formatDistanceToNow } from 'date-fns';
import { useDeleteErrorSuppressionMutation, useGetErrorSuppressionsQuery } from '../../redux/api/errorSuppressionApi';
import { GenericButton } from '../common/buttons';
import AddOrUpdateErrorSuppressionModal from './AddOrUpdateErrorSuppressionModal';
import classNames from 'classnames';
import { borderClasses } from '../../styling';

const tableStyling = 'grid grid-cols-12 gap-4';

const restrictMatcherCharacters = (matcher: string) => {
  if (matcher.length <= 50) {
    return matcher;
  }
  return `${matcher.substring(0, 50)}...`;
}

const ErrorSuppressionTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [addOrUpdateModalOpen, setAddOrUpdateModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<ErrorSuppressionDTO | null>(null);
  const { data: errorSuppressions, isLoading, isError, error } = useGetErrorSuppressionsQuery();
  const [deleteErrorSuppression, {
    isLoading: isDeleting,
    isSuccess: deleteSuccess,
    isError: deleteError,
  }] = useDeleteErrorSuppressionMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredRules = (errorSuppressions || []).filter(rule => 
    rule.functionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.matchers.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddOrUpdateRule = (rule?: ErrorSuppressionDTO) => {
    setEditingRule(rule);
    setAddOrUpdateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteErrorSuppression(id);
  };

  useEffect(() => {
    if (deleteSuccess || deleteError) {
      setDeletingId(null); // Reset after success or error
    }
  }, [deleteError, deleteSuccess]);

  if (isLoading) {
    return <div>Loading Error Suppressions...</div>;
  }

  if (isError) {
    return <div>Error: {(error as any)?.data?.message || (error as Error).message}</div>;
  }

  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Function names or matchers"
            className={classNames(borderClasses, 'p-2 rounded-lg')}
          />
        </div>
        <div className="flex gap-2">
          <GenericButton text='Add Suppression' onClick={() => setAddOrUpdateModalOpen(true)} />
        </div>
      </div>

      {filteredRules.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
          <div className="text-muted-foreground">
            {searchQuery ? 'No matching rules found' : 'No error suppression rules yet'}
          </div>
          <button 
            className="mt-4"
            onClick={() => setAddOrUpdateModalOpen(true)}
          >
            Add Your First Rule
          </button>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className={classNames(
            tableStyling,
            'p-3 px-6 text-sm font-medium',
            'border-b',
            )}>
            <div className="col-span-10 sm:col-span-4">Service / Env / Function</div>
            <div className="col-span-4 hidden sm:block">Matchers</div>
            <div className="col-span-3 hidden sm:block">Reason</div>
            <div>Actions</div>
          </div>
          
          <div className={classNames('divide-y')}>
            {filteredRules.map((rule, ruleIndex) => {
              const formattedDate = formatDistanceToNow(
                (rule.createdAt || new Date()), { addSuffix: true },
              );
              
              return (
                <div 
                  key={rule.id} 
                  className={classNames(
                    tableStyling,
                    'p-3 px-6 items-center hover:bg-muted/20 animate-fade-in group hover:bg-background-300',
                    {
                      'rounded-b-md': ruleIndex === filteredRules.length - 1,
                    }
                  )}
                >
                  <div className="col-span-10 sm:col-span-4">
                    <div className="font-medium flex items-center">
                      <span className="truncate">{rule.functionName}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Created {formattedDate}
                    </div>
                  </div>
                  
                  <div className="col-span-4 hidden sm:block overflow-hidden">
                    <div className="flex flex-col gap-1">
                      {rule.matchers.length > 0 ? (
                        rule.matchers.slice(0, 3).map((matcher) => (
                          (<span
                            className={classNames('border border-dashed rounded-md px-2 py-1')}
                            title={matcher}>
                              {restrictMatcherCharacters(matcher)}
                          </span>)
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground italic">No matchers</span>
                      )}
                      {rule.matchers.length > 3}
                    </div>
                  </div>

                  <div className="col-span-3 hidden sm:block overflow-hidden">
                    <div className="flex flex-col gap-1">
                      <span>{rule.reason}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <GenericButton text='Edit' onClick={() => {
                      handleAddOrUpdateRule(rule);
                    }} size='sm' />

                    <GenericButton
                      text='Delete'
                      onClick={() => handleDelete(rule.id)}
                      primary={false}
                      size='sm'
                      destructive
                      loading={deletingId === rule.id && isDeleting}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>

  
    {addOrUpdateModalOpen && (<AddOrUpdateErrorSuppressionModal
      onOpenChange={setAddOrUpdateModalOpen}
      errorSuppression={editingRule}
    />)}
    </>
  );
};

export default ErrorSuppressionTable;
