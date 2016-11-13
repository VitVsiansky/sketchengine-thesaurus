import * as t from './action-types';

export function add(message) {
  return {
    type: t.ADD,
    message
  };
}

export function del(id) {
  return {
    type: t.DELETE,
    id
  };
}

export function deleteAll() {
  return {
    type: t.DELETE_ALL,
  };
}
