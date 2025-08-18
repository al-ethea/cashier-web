import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SquareX } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface IDeleteModalProps {
  deleteContext: string;
  id?: string;
  className?: string;
  onDelete: (password?: string) => void;
  onRefresh?: () => void;
  withPassword?: boolean;
  password?: string;
}

export default function DeleteModal(props: IDeleteModalProps) {
  const [password, setPassword] = React.useState('');
  const [openDeleteConfirmInput, setOpenDeleteConfirmInput] = React.useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = React.useState('');
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={props.className}>
        Delete <SquareX className='text-sm' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {`This action cannot be undone. This will permanently delete this ${props.deleteContext} and remove your data from the
            servers.`}
          </DialogDescription>
          {props.withPassword && (
            <form>
              <Input
                type='password'
                placeholder='Password'
                value={props.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </form>
          )}
          {openDeleteConfirmInput && (
            <>
              <Label htmlFor='deleteConfirmInput'>Type 'delete' to confirm</Label>
              <Input
                id='deleteConfirmInput'
                type='text'
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
              />
            </>
          )}
        </DialogHeader>
        <DialogFooter className='flex !justify-center gap-3 md:gap-6'>
          {!openDeleteConfirmInput && (
            <Button className='bg-red-500 hover:bg-red-600 text-white' onClick={() => setOpenDeleteConfirmInput(true)}>
              Delete
            </Button>
          )}
          {openDeleteConfirmInput && (
            <Button
              disabled={deleteConfirmInput !== 'delete'}
              className={
                deleteConfirmInput === 'delete'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }
              onClick={() => {
                if (deleteConfirmInput === 'delete') {
                  try {
                    if (props.withPassword) {
                      props.onDelete?.(password);
                    } else {
                      props.onDelete?.();
                    }
                    setOpen(false);
                  } catch (error) {
                    console.error('Delete failed:', error);
                  }
                }
              }}>
              Confirm Delete
            </Button>
          )}
          <DialogClose asChild>
            <Button className='bg-gray-500 hover:bg-gray-600 text-white' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
