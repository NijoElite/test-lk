import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';

import { authContext } from '../../../../contexts/auth';
import { getContacts, updateContact, deleteContact, createContact } from '../../../../services/contacts';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import { useMount } from '../../../../hooks/useMount';

import './Contacts.scss';
import Paranja from '../../../../components/Paranja/Paranja';
import { useForm } from '../../../../hooks/useForm';
import Spinner from '../../../../components/Spinner/Spinner';
import Form from '../../../../components/Form/Form';

const cnContacts = cn('Contacts');

const contactsCn = cnContacts();
const listCn = cnContacts('List');
const rowAccentCn = cnContacts('ListRow', { accent: true });
const cellCn = cnContacts('ListCell');
const summaryCn = cnContacts('Summary');
const summaryInnerCn = cnContacts('SummaryInner');

const formatName = ({ firstName, lastName }) => `${firstName} ${lastName}`;

const ContactsList = ({ contacts, onRowClick, onCreateNewClick, selectedId }) => {
  const sortByFirstName = (a, b) => {
    if (a.firstName < b.firstName) { return -1; }
    if (a.firstName > b.firstName) { return 1; }
    return 0;
  };

  return (
    <div className={listCn}>
      <div className={rowAccentCn} onClick={onCreateNewClick}>
        <div className={cellCn}>Добавить контакт</div>
      </div>
      {contacts.sort(sortByFirstName).map(item => {
        return (
          <div key={item.id} className={cnContacts('ListRow', { selected: item.id === selectedId })} onClick={() => onRowClick(item)}>
            {formatName(item)}
          </div>
        );
      })}
    </div>
  );
};

const Summary = ({ contact, onSave, onDelete }) => {
  const isNewContact = !contact;

  contact = useMemo(() => {
    return contact || {};
  }, [contact]);

  const onDeleteClick = useCallback(() => {
    onDelete(contact.id);
  }, [contact.id, onDelete]);

  const onSuccessSubmit = useCallback((e, { firstName, lastName, phone }) => {
    onSave(contact.id, { firstName, lastName, phone });
  }, [contact, onSave]);

  const onErrorSubmit = useCallback((e, values, errors) => {
    e.preventDefault();

    const message = Object.values(errors).join('\n');
    alert(message);
  }, []);

  const validate = useCallback(values => {
    const errors = {};
    const phoneRegExp = /^\+{0,1}[\d\s-()]+$/;

    if (values['firstName'].length === 0) {
      errors['firstName'] = 'Введите имя';
    }

    if (values['lastName'].length === 0) {
      errors['lastName'] = 'Введите фамилию';
    }

    if (values['phone'].length === 0) {
      errors['phone'] = 'Введите номер телефона';
    } else if (!values['phone'].match(phoneRegExp)) {
      errors['phone'] = 'Неверный формат номера';
    }

    return errors;
  }, []);

  const { values, setValues, onChange, onFormSubmit } = useForm({
    onSuccess: onSuccessSubmit,
    onError: onErrorSubmit,
    validate,
    defaultValues: {
      firstName: contact.firstName || '',
      lastName: contact.lastName || '',
      phone: contact.phone || '',
    },
  });

  useEffect(() => {
    setValues({
      firstName: contact.firstName || '',
      lastName: contact.lastName || '',
      phone: contact.phone || '',
    });
  }, [contact, setValues]);

  return (
    <Form className={summaryCn} >
      <div className={summaryInnerCn}>
        <Form.Input caption="Имя" name="firstName" value={values['firstName']} onChange={onChange} placeholder="James"/>
        <Form.Input caption="Фамилия" name="lastName" value={values['lastName']} onChange={onChange} placeholder="McAvoy"/>
        <Form.Input caption="Номер телефона" name="phone" value={values['phone']} onChange={onChange} placeholder="+7 (922) 288-14-33"/>
        <Form.Submit onClick={onFormSubmit}>Сохранить</Form.Submit>
        {!isNewContact && <Form.Submit onClick={onDeleteClick}>Удалить</Form.Submit>}
      </div>
    </Form>
  );
};

const Contacts = () => {
  const auth = useContext(authContext);
  const userId = auth.user.payload.sub;
  const accessToken = auth.user.accessToken;

  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [search, setSearch] = useState('');

  const onError = useCallback(error => {
    alert(error.message);
  }, []);

  const onCreate = useCallback(async (id, fields) => {
    setLoading(true);
    const response = await createContact({ userId, accessToken, fields });
    setLoading(false);

    if (response.error) {
      onError(response.error);
      return;
    }

    const createdContact = response.data;
    setSelectedContactId(createdContact.id);
    setContacts([createdContact, ...contacts]);
  }, [accessToken, contacts, onError, userId]);

  const onSave = useCallback(async (id, fields) => {
    setLoading(true);
    const response = await updateContact({ accessToken, contactId: id, userId, fields });
    setLoading(false);

    if (response.error) {
      onError(response.error);
      return;
    }

    const contact = response.data;
    const updatedContacts = contacts.map(el => el.id === contact.id ? contact : el);
    setContacts(updatedContacts);
  }, [accessToken, contacts, onError, userId]);

  const onDelete = useCallback(async contactId => {
    setLoading(true);
    const response = await deleteContact({ userId, accessToken, contactId });
    setLoading(false);

    if (response.error) {
      onError(response.error);
      return;
    }

    setContacts(contacts.filter(el => el.id !== contactId));
  }, [accessToken, contacts, onError, userId]);

  const onRowClick = useCallback(contact => {
    setSelectedContactId(contact.id);
  }, []);

  const onCreateNewClick = useCallback(() => {
    setSelectedContactId(null);
  }, []);

  // Обновляем список контактов при первой загрузке
  useMount(() => {
    const loadAll = async () => {
      setLoading(true);
      const response = await getContacts({ userId, accessToken });
      setLoading(false);

      if (response.error) {
        onError(response.error);
        return;
      }

      setContacts(response.data);
    };

    loadAll();
  });

  const onSearchChange = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const selectedContact = useMemo(() => {
    return contacts.find(el => el.id === selectedContactId);
  }, [contacts, selectedContactId]);

  return (
    <>
      <Button className={cnContacts('Exit')} onClick={() => auth.logout()} size="s">X</Button>
      <Input placeholder="Найти..." onChange={onSearchChange} value={search}/>
      <div className={contactsCn}>
        <Paranja active={isLoading}/>
        <Spinner active={isLoading} fullscreen/>
        <ContactsList
          contacts={contacts.filter(el => formatName(el).toLowerCase().includes(search.toLowerCase()))}
          onRowClick={onRowClick}
          onCreateNewClick={onCreateNewClick}
          selectedId={selectedContactId}
        />
        <Summary
          contact={selectedContact}
          onDelete={onDelete}
          onSave={selectedContact ? onSave : onCreate}
        />
      </div>
    </>
  );
};

export default Contacts;
