import { onValue, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";

import {
  ref as refStorage,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import uuid from "react-uuid";
import styled from "styled-components";
import { db, storage } from "../../firebase";
import check from "./../../img/check.png";
import {
  TodoContainer,
  MakeTodo,
  Item,
  Footer,
  ButtonPageBlock,
  ButtonPage,
  Icon,
  TopBlock,
  CheckFinish,
  StatusTodoText,
  Description_Info,
  TitleTodo,
  DeleteTodo,
  DataBlock,
  SendTodo,
  PROGRESS,
  DownloadButton,
} from "./style/style";

interface TodoItems {
  text: string;
  active: boolean;
  id: string;
  description: string;
  dateF: string;
  file: string;
}

const FinishDate = styled.input``;
const Todo = () => {
  const [titleTodo, setTitleTodo] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [todoItem, setTodoItem] = useState<TodoItems[]>([]);
  const [activeTodo, setActiveTodo] = useState<TodoItems[]>([]);
  const [finishTodo, setFinishTodo] = useState<TodoItems[]>([]);
  const [sortBy, setSortBy] = useState<string>("all");
  const [statusTodo, setStatusTodo] = useState<string>("status");
  const [progress, setProgress] = useState(0);
  const [fileUpload, setFileUpload] = useState<any>(null);

  const dayjs = require("dayjs"); //Подключаемся к dayjs
  let now = dayjs(new Date()); //Сегоднешняя дата
  const nowDate = `${now.$y}-${now.$M + 1}-${now.$D}`; // берем год месяц число
  const [dates, setDate] = useState<any>(nowDate); //записываем результат

  /**
   * Для onChange в input date
   */
  const changeDate = (e: React.ChangeEvent<HTMLDataElement>) => {
    setDate(e.target.value);
  };
  /**
   * Для onChange в название TODO
   */
  const onChangeTitleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTodo(e.target.value);
  };
  /**
   * Для onChange в описание TODO
   */
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(e.target.value);
  };
  /**
   * Объект которые передается в firebase (без файла)
   */
  const todoObjectInfo = {
    text: titleTodo,
    description: descriptionValue,
    active: true,
    dateF: dates,
  };
  /**
   * Для фильтра по всем todo
   */
  const filterAll = () => {
    setSortBy("all");
  };
  /**
   * Для фильтра по активным todo
   */
  const filterActive = () => {
    setActiveTodo(todoItem.filter((i: TodoItems) => i.active === true));
    setSortBy("active");
  };
  /**
   * Для фильтра по законченым todo
   */
  const filterCompleted = () => {
    setFinishTodo(todoItem.filter((i: TodoItems) => i.active === false));
    setSortBy("finish");
  };

  /**
   * Для подсчета количества TODO всего,активных, законченных
   * @returns {number} возращает количество TODO всего,активных, законченных
   */

  const counterTodo = () => {
    if (sortBy === "active") {
      return activeTodo.length;
    } else if (sortBy === "finish") {
      return finishTodo.length;
    }
    return todoItem.length;
  };
  /**
   * Для фильтрации TODO
   * @returns {number} возращает массив всего,активных или законченных
   */
  const filterTodos = () => {
    if (sortBy === "active") {
      return activeTodo;
    } else if (sortBy === "finish") {
      return finishTodo;
    }
    return todoItem;
  };
  /**
   * Показывает статус TODO активен ил нет
   *
   */
  const StatusTodo = (item: TodoItems) => {
    if (
      todoItem.find((i: TodoItems) => i.id === item.id && i.active === true)
    ) {
      setStatusTodo("Active");
    }
    if (
      todoItem.find((i: TodoItems) => i.id === item.id && i.active === false)
    ) {
      setStatusTodo("Completed");
    }
  };

  /**
   * записывает выбранный файл в  fileUpload
   *
   */
  const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files !== null && e.target.files[0];
    setFileUpload(file);
  };

  /**
   * Для отправки файла в firebase storage и расчета прогреса
   *
   */
  const uploadFile = () => {
    if (fileUpload === null) {
      return;
    }
    const fileRef = refStorage(storage, `/files/${fileUpload.name + uuid()}`);
    const uploadIndusFile = uploadBytesResumable(fileRef, fileUpload);

    uploadIndusFile.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {},
      () => {
        getDownloadURL(uploadIndusFile.snapshot.ref)
          .then((url) => {
            setFilesArray((prev: string[]) => [...prev, url]);
          })
          .then(() => setProgress(0));
      }
    );
  };

  const [filesArray, setFilesArray] = useState<string[]>([]);
  const filesStorageRef = refStorage(storage, "files/");
  /**
   * достаем  данные файлов  из firebase storage
   */
  useEffect(() => {
    const getData = () => {
      listAll(filesStorageRef).then((res) => {
        res.items.map((item) => {
          getDownloadURL(item).then((url) => {
            setFilesArray((prev: any) => [...prev, url]);
          });
        });
      });
    };
    getData();
  }, []);

  /**
   * достаем  информацию TODO  из firebase database
   */
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodoItem([]);
      const data = snapshot.val();

      if (data !== null) {
        Object.values(data).map((todo: any) => {
          console.log(todo);
          setTodoItem((prev: TodoItems[]) => [...prev, todo]);
        });
      }
    });
  }, []);

  /**
   * Создание TODO
   */
  const makeItem = () => {
    const id = uuid();
    if (fileUpload === null) {
      alert("Загрузите файл");
      return;
    }

    if (titleTodo.trim() !== "") {
      set(ref(db, `/${id}`), {
        ...todoObjectInfo,
        id: id,
        file: filesArray?.pop(),
      });
      setTitleTodo("");
    }
  };

  /**
   * Удаление TODO
   */
  const deleteTodo = (todo: string) => {
    remove(ref(db, `/${todo}`));
  };
  /**
   * обновление TODO активное  (при нажатии на квадратик слева от названия)
   */
  const upDateTrue = (todo: string) => {
    update(ref(db, `/${todo}`), {
      active: true,
      id: todo,
    });
  };
  /**
   * обновление TODO завершенное  (при нажатии на квадратик слева от названия)
   */
  const upDateFalse = (todo: string) => {
    update(ref(db, `/${todo}`), {
      active: false,
      id: todo,
    });
  };

  return (
    <TodoContainer>
      <TopBlock>
        <MakeTodo
          data-testid="todoInput"
          maxLength={32}
          type="text"
          placeholder="Name TODO"
          value={titleTodo}
          onChange={onChangeTitleTodo}
        />
        <Description_Info
          maxLength={150}
          placeholder="Text TODO"
          value={descriptionValue}
          onChange={onChangeDescription}
        />
        <DataBlock>
          <span>Дата завершения:</span>
          <FinishDate type="date" value={dates} onChange={changeDate} />
        </DataBlock>

        <input type="file" onChange={handlerFile} />
        <DownloadButton onClick={uploadFile}>
          Загрузить файл в базу данных
        </DownloadButton>
        <PROGRESS style={{ width: `${progress}%` }} />
        <SendTodo onClick={makeItem}>СОЗДАТЬ</SendTodo>
      </TopBlock>
      {filterTodos().map((item: TodoItems, index) => (
        <Item key={index} onMouseMove={() => StatusTodo(item)}>
          {todoItem.find(
            (i: any) =>
              i.id === item.id && i.active === true && nowDate === i.dateF
          ) ? (
            <CheckFinish onClick={() => upDateFalse(item.id)} />
          ) : (
            <Icon src={check} onClick={() => upDateTrue(item.id)} />
          )}

          <TitleTodo>{item.text}:</TitleTodo>
          <p>{item.description}</p>
          {item.dateF}
          {
            <a href={item.file} className="href">
              Файл
            </a>
          }
          <DeleteTodo onClick={() => deleteTodo(item.id)}>Удалить</DeleteTodo>
        </Item>
      ))}
      <Footer>
        <span>{counterTodo()} items left</span>
        <ButtonPageBlock>
          <ButtonPage
            onClick={filterAll}
            style={{ border: sortBy === "all" ? "1px solid #b3b1b3" : "" }}
          >
            All
          </ButtonPage>
          <ButtonPage
            onClick={filterActive}
            style={{ border: sortBy === "active" ? "1px solid #b3b1b3" : "" }}
          >
            Active
          </ButtonPage>
          <ButtonPage
            onClick={filterCompleted}
            style={{ border: sortBy === "finish" ? "1px solid #b3b1b3" : "" }}
          >
            Completed
          </ButtonPage>
        </ButtonPageBlock>
        <StatusTodoText>{statusTodo}</StatusTodoText>
      </Footer>
    </TodoContainer>
  );
};

export default Todo;
