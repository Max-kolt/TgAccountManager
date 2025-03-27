import { ChooseInput } from "../../field/ChooseInput";
import { UpdateField } from "../../field/UpdateInput";

type AccountViewProps = {
  accountState: [
    AccountInfo,
    React.Dispatch<React.SetStateAction<AccountInfo>>
  ];
  fnameState: [string, React.Dispatch<React.SetStateAction<string>>];
  lnameState: [string, React.Dispatch<React.SetStateAction<string>>];
  descriptionState: [string, React.Dispatch<React.SetStateAction<string>>];
  genderState: [
    "М" | "Д" | "",
    React.Dispatch<React.SetStateAction<"М" | "Д" | "">>
  ];
};

export function AccountView({
  accountState,
  fnameState,
  lnameState,
  genderState,
  descriptionState,
}: AccountViewProps) {
  const [accountInfo, setAccountInfo] = accountState;
  const [fname, setFname] = fnameState;
  const [lname, setLname] = lnameState;
  const [gender, setGender] = genderState;
  const [description, setDescription] = descriptionState;

  const fnameSave = () => {
    console.log(fname);
  };
  const lnameSave = () => {
    console.log(lname);
  };
  const descriptionSave = () => {
    console.log(description);
  };

  const genderSave = (new_gender: "М" | "Д") => {
    console.log(new_gender);
    setGender(new_gender);
  };
  return (
    <div className="w-full">
      <h2>@{accountInfo?.login}</h2>
      <p>Телефон: {accountInfo?.phone}</p>
      <br />
      <div className="w-2/3 flex gap-4 max-md:flex-col">
        <UpdateField
          value={fname}
          onChange={(v) => setFname(v)}
          callbackHandler={fnameSave}
          label="Имя"
        />
        <UpdateField
          value={lname}
          onChange={(v) => setLname(v)}
          callbackHandler={lnameSave}
          label="Фамилия"
        />
        <ChooseInput
          label="Пол"
          options={["М", "Д"]}
          onChange={genderSave}
          current={gender}
        />
      </div>
      <br />
      <UpdateField
        value={description}
        onChange={(v) => setDescription(v)}
        callbackHandler={descriptionSave}
        label="Описание"
      />
    </div>
  );
}
