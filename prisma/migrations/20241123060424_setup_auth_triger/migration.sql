-- Function to handle the insertion of a new user into the 'profiles' table
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  -- Insert the new user's data into the 'User' table
  insert into "public"."user" (id, email)
  values (new.id, new.email);

  return new;     -- Return the new record
end;
$$;

-- Function to handle the updating of a user's information in the 'User' table
create function public.update_user()
returns trigger
language plpgsql
security definer set search_path = ''
as
$$
begin
  -- Update the user's data in the 'User' table
  update "public"."User"
  set email = new.email     -- Update the 'email' field
  where id = new.id;        -- Match the 'id' field with the new record

  return new;  -- Return the new record
end;
$$;

-- Function to handle the deletion of a user from the 'user' table
create function public.delete_user()
returns trigger
language plpgsql
security definer set search_path = ''
as
$$
begin
  -- Delete the user's data from the 'profiles' table
  delete from "public"."User"
  where id = old.id;  -- Match the 'id' field with the old record

  return old;  -- Return the old record
end;
$$;

do $$ 
    begin
    IF EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'auth' 
        AND table_name = 'users'
    ) THEN
    -- Trigger to run 'handle_new_user' function after a new user is inserted into 'auth.users' table
    create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

    -- Trigger to run 'update_user' function after a user is updated in the 'auth.users' table
    create trigger on_auth_user_updated
    after update on auth.users
    for each row execute procedure public.update_user();

    -- Trigger to run 'delete_user' function after a user is deleted from the 'auth.users' table
    create trigger on_auth_user_deleted
    after delete on auth.users
    for each row execute procedure public.delete_user();
end if;
end;
$$;