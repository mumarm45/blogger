import {Comment} from './Comment';

/**
 * Created by mumarm45 on 23/02/2019.
 */
export interface Blog {
  id: string;
  userId: string;
  createdAt: string;
  name: string;
  avatar: string;
  blogImage: string;
  tags: string;
  likes: number;
  description: string;
  comments?: Comment[];
  title: string;
}
